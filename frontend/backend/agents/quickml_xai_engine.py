import requests
import json
import os
from types import SimpleNamespace
from typing import Dict, Any, Optional
import re

quickml_client = None


def test_quickml_connection() -> bool:
    global quickml_client
    if quickml_client is None:
        quickml_client = QuickMLExplainableAI()
    try:
        response = quickml_client.ping()
        return getattr(response, "status", None) == "success"
    except Exception:
        return False


class QuickMLExplainableAI:
    def __init__(self):
        global quickml_client

        self.org_id = os.getenv("CATALYST_ORG_ID") or os.getenv("QUICKML_ORG_ID") or "60078554986"
        self.auth_token = os.getenv("QUICKML_AUTH_TOKEN") or os.getenv("ZOHO_AUTH_TOKEN") or os.getenv("ZOHO_ACCESS_TOKEN") or ""
        self.access_token = self.auth_token or os.getenv("ZOHO_ACCESS_TOKEN", "")
        self.refresh_token = os.getenv("ZOHO_REFRESH_TOKEN", "")
        self.client_id = os.getenv("ZOHO_CLIENT_ID", "")
        self.client_secret = os.getenv("ZOHO_CLIENT_SECRET", "")
        self.region = os.getenv("CATALYST_REGION", "in")
        self.project_id = os.getenv("CATALYST_PROJECT_ID") or "45680000000016001"

        self.api_endpoint = f"https://api.catalyst.zoho.{self.region}/quickml/v1/project/{self.project_id}/glm/chat"
        self.token_url = f"https://accounts.zoho.{self.region}/oauth/v2/token"

        self.system_prompt = (
            "You are an elite Crime Intelligence Assistant for law enforcement. "
            "Provide ONLY the final, professional answer. "
            "DO NOT show your analysis steps, reasoning process, or internal thoughts. "
            "DO NOT number your analysis steps. "
            "Speak directly and professionally to the officer. "
            "Cite specific CaseMasterID, AccusedMasterID, and ArrestSurrenderID when applicable."
        )
        quickml_client = self

    def _headers(self) -> dict:
        headers = {
            "Authorization": f"Zoho-oauthtoken {self.access_token or self.auth_token}",
            "Content-Type": "application/json"
        }
        if self.org_id:
            headers["CATALYST-ORG"] = self.org_id
        return headers

    def _refresh_access_token(self) -> bool:
        if not self.refresh_token or not self.client_id or not self.client_secret:
            return False
        try:
            resp = requests.post(self.token_url, data={
                "grant_type": "refresh_token",
                "client_id": self.client_id,
                "client_secret": self.client_secret,
                "refresh_token": self.refresh_token
            }, timeout=10)
            resp.raise_for_status()
            data = resp.json()
            new_token = data.get("access_token")
            if new_token:
                self.access_token = new_token
                return True
            return False
        except Exception:
            return False

    def _post_with_retry(self, payload: dict, timeout: int):
        headers = self._headers()
        response = requests.post(self.api_endpoint, json=payload, headers=headers, timeout=timeout)
        if response.status_code == 401:
            if self._refresh_access_token():
                response = requests.post(self.api_endpoint, json=payload, headers=self._headers(), timeout=timeout)
        return response

    def generate_explainable_response(self, user_query: str, database_context: Dict[str, Any], fir_context: Optional[str] = None) -> str:
        context_text = f"DATABASE CONTEXT:\n{json.dumps(database_context, indent=2)}\n"
        if fir_context:
            context_text += f"FIR DOCUMENTS CONTEXT:\n{fir_context}\n"

        payload = {
            "model": "crm-di-glm47b_30b_it",
            "messages": [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": f"Context:\n{context_text}\n\nQuery: {user_query}"}
            ],
            "max_tokens": 500,
            "temperature": 0.7,
            "stream": False
        }

        try:
            response = self._post_with_retry(payload, timeout=30)
            response.raise_for_status()
            result = response.json()

            # DEBUG: Print the actual response structure
            print(f"DEBUG API Response: {json.dumps(result, indent=2)}")

            # Try multiple extraction methods
            clean_response = self._extract_clean_response(result)
            return clean_response

        except Exception as e:
            print(f"ERROR in generate_explainable_response: {str(e)}")
            return f"System Error: {str(e)}. Check your auth token and connection."

    def ping(self):
        ok = self.test_connection()
        return SimpleNamespace(status="success" if ok else "error")

    def test_quickml_connection(self) -> bool:
        return self.test_connection()
