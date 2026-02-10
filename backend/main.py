import json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from resume_parser import extract_resume_text

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

with open("skills.json") as f:
    JOB_SKILLS = json.load(f)

@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    role: str = Form(...)
):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file uploaded")

    try:
        resume_text = extract_resume_text(file)
    except ValueError:
        raise HTTPException(
            status_code=400,
            detail="Only PDF or DOCX resumes are supported"
        )

    required_skills = JOB_SKILLS.get(role.lower(), [])

    found_skills = [s for s in required_skills if s in resume_text]
    missing_skills = [s for s in required_skills if s not in resume_text]

    match_percentage = int(
        (len(found_skills) / len(required_skills)) * 100
    ) if required_skills else 0

    return {
        "match_percentage": match_percentage,
        "found_skills": found_skills,
        "missing_skills": missing_skills
    }
