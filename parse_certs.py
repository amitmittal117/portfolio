
import json
import re

# Existing data
try:
    with open('src/data/certificates.json', 'r') as f:
        data = json.load(f)
        existing_certs = data.get('certificates', [])
except FileNotFoundError:
    existing_certs = []

# Map existing by title for dup check
existing_titles = {c['title']: c for c in existing_certs}

# New data parsing
new_certs = []
with open('certs.txt', 'r') as f:
    lines = [l.strip() for l in f.readlines() if l.strip()]

current_title = ""
for i, line in enumerate(lines):
    if line.startswith("Earned"):
        # Previous line was title
        date_str = line.replace("Earned ", "").replace(" EST", "").replace(" EDT", "")
        # Extract date. "Dec 10, 2025".
        # We can store full date or just year. Existing is "2024".
        # Let's try to extract year for "date" field, and maybe put full date in description?
        # Or store full date in "date" field.
        # existing: "2025".
        # I'll use the full date string for now, it's more informative.
        # But for consistency, maybe I should use "2025".
        # The user's list is sorted by date.
        # I'll stick to full date string "Dec 10, 2025".
        
        # Image logic
        image = "./img/google-cloud-generic.png"
        if "Introduction to AI and Machine Learning on Google Cloud" in current_title:
             image = "./img/Introduction-to-AI-and-Machine-Learning-on-Google-Cloud.png"
        
        # Duplicate check?
        if current_title in existing_titles:
            # Update specific fields if needed, or skip?
            # Existing might have better data (url, description).
            # I'll skip if exists.
            current_title = ""
            continue
            
        cert = {
            "date": date_str,
            "title": current_title,
            "company": "Google Cloud", # Assumption
            "description": f"Earned {date_str}",
            "publicUrl": "#",
            "skills": [],
            "image": image
        }
        new_certs.append(cert)
        current_title = ""
    else:
        current_title = line
        # Handle the last line "Professional ML Engineer Study Guide" which has no date line
        # It will be left as current_title and ignored if loop ends.

# Combine
all_certs = existing_certs + new_certs

# Save
with open('src/data/certificates.json', 'w') as f:
    json.dump({"certificates": all_certs}, f, indent=2)

print(f"Added {len(new_certs)} new certificates.")
