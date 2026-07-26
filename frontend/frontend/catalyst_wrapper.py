import os
from pathlib import Path
import zcatalyst_sdk

def init_catalyst_client():
    """Initialize and return the Zoho Catalyst SDK client."""
    try:
        # Construct the path to the SDK configuration file
        # This assumes 'backend' is a sibling directory to this file, which is true in the ksp folder structure
        base_dir = Path(__file__).parent.parent
        config_path = base_dir / "zcatalyst-sdk-config.json"
        
        if config_path.exists():
            # Initialize SDK with the specific configuration file
            # The SDK constructor accepts the config path as the first positional argument
            app = zcatalyst_sdk.initialize(str(config_path))
            return app
        else:
            print(f"[Catalyst Warning] SDK config not found at: {config_path}")
            # Try default initialization
            return zcatalyst_sdk.initialize()
            
    except Exception as e:
        print(f"[Catalyst Error] Could not initialize SDK: {e}")
        return None
