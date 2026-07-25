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