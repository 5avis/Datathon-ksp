import logging
from flask import Request, make_response, jsonify
import zcatalyst_sdk


def handler(request: Request):
    app = zcatalyst_sdk.initialize()
    logger = logging.getLogger(__name__)

    if request.path == "/" or request.path == "":
        return make_response(
            jsonify({
                "status": "success",
                "message": "Crime Analytics Serverless Function Active",
                "service": "crime_function"
            }),
            200
        )
    elif request.path == "/cache":
        default_segment = app.cache().segment()
        insert_resp = default_segment.put("Name", "DefaultName")
        logger.info("Inserted cache: " + str(insert_resp))
        get_resp = default_segment.get("Name")
        return jsonify(get_resp), 200
    else:
        return make_response(jsonify({"error": "Path not found"}), 404)
