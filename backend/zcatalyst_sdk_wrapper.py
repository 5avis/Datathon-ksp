try:
    import zcatalyst_sdk
except ImportError:
    zcatalyst_sdk = None


class _CatalystDatastoreFallback:
    def execute_zcql(self, query: str):
        return []

    def datastore(self):
        return self


def get_zcql_client():
    """Initialize and return the Zoho Catalyst Data Store client / ZCQL service."""
    if zcatalyst_sdk is not None:
        try:
            app = zcatalyst_sdk.initialize()
            return app.datastore()
        except Exception as e:
            print(f"[ZCQL Client Warning] Could not initialize zcatalyst_sdk datastore: {e}")
    return _CatalystDatastoreFallback()


def execute_catalyst_search(search_word: str, table_columns: dict = None):
    """
    Search indexed columns in Zoho Catalyst Data Store tables using Catalyst SDK.
    
    Example Config Format:
    config = {
        "search": "theft",
        "search_table_columns": {
            "CaseMaster": ["BriefFacts", "CrimeNo", "CaseNo"],
            "Accused": ["AccusedName"],
            "Victim": ["VictimName"],
            "ComplainantDetails": ["ComplainantName"]
        }
    }
    """
    if table_columns is None:
        table_columns = {
            "CaseMaster": ["BriefFacts", "CrimeNo", "CaseNo"],
            "Accused": ["AccusedName"],
            "Victim": ["VictimName"],
            "ComplainantDetails": ["ComplainantName"]
        }

    if zcatalyst_sdk is not None:
        try:
            app = zcatalyst_sdk.initialize()
            search_service = app.search()
            config = {
                "search": search_word,
                "search_table_columns": table_columns
            }
            results = search_service.execute_search_query(config)
            return results
        except Exception as e:
            print(f"[Catalyst Search Notice] Catalyst search API query: {e}")
            return None
    return None