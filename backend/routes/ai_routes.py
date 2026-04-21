from flask import Blueprint, request, jsonify
from ai.recommendation_model import get_recommendations
from ai.nlp_search import parse_query
from ai.recommendation_model import df

ai_routes = Blueprint("ai_routes", __name__)

# 🔥 Recommendation API
@ai_routes.route("/recommendations", methods=["GET","POST"])
def recommendations():
    if request.method == "GET":
        return "Use POST method"
    data = request.json
    interest = data.get("interest", "")

    results = get_recommendations(interest)

    return jsonify(results[:5])


# 🔥 Smart Search API
@ai_routes.route("/smart-search", methods=["POST"])
def smart_search():
    data = request.json
    query = data.get("query", "")

    filters = parse_query(query)

    results = df.copy()

    if filters["category"]:
        results = results[results["category"] == filters["category"]]

    if filters["location"]:
        results = results[results["location"] == filters["location"]]

    return jsonify(results.to_dict(orient="records"))

    registered_users = []

@ai_routes.route("/register", methods=["POST"])
def register():
    data = request.json

    registered_users.append(data)

    return jsonify({
        "message": "Registration successful",
        "data": data
    })