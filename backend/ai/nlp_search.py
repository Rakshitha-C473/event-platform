def parse_query(query):
    query = query.lower()

    filters = {
        "category": None,
        "location": None
    }

    # Detect category
    if "hackathon" in query or "coding" in query or "ai" in query:
        filters["category"] = "Tech"

    elif "cultural" in query or "dance" in query or "music" in query:
        filters["category"] = "Cultural"

    elif "sports" in query or "football" in query:
        filters["category"] = "Sports"

    # Detect location
    if "bangalore" in query:
        filters["location"] = "Bangalore"

    elif "mysore" in query:
        filters["location"] = "Mysore"

    elif "online" in query:
        filters["location"] = "Online"

    return filters