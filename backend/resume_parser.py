from pypdf import PdfReader
from docx import Document

def extract_text_from_pdf(file_obj):
    file_obj.seek(0)
    reader = PdfReader(file_obj)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text.lower()

def extract_text_from_docx(file_obj):
    file_obj.seek(0)
    doc = Document(file_obj)   # ✅ correct: file_obj is a stream
    text = ""
    for para in doc.paragraphs:
        text += para.text + " "
    return text.lower()

def extract_resume_text(upload_file):
    filename = upload_file.filename.lower()

    if filename.endswith(".pdf"):
        return extract_text_from_pdf(upload_file.file)

    elif filename.endswith(".docx"):
        return extract_text_from_docx(upload_file.file)

    else:
        raise ValueError("Unsupported file format")
