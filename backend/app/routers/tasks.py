from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt
from app.database import SessionLocal
from app.models import Task, User

SECRET_KEY = "secret"
ALGORITHM = "HS256"

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(token: str, db: Session):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")

        user = db.query(User).filter(User.email == email).first()

        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.post("/tasks")
def create_task(title: str, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)

    if not title:
        raise HTTPException(status_code=400, detail="Title required")

    new_task = Task(title=title, owner_id=user.id)

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/tasks")
def get_tasks(token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)

    return db.query(Task).filter(Task.owner_id == user.id).all()


@router.put("/tasks/{task_id}")
def update_task(task_id: int, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == user.id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    task.completed = True
    db.commit()

    return {"msg": "Task updated"}


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, token: str, db: Session = Depends(get_db)):
    user = get_current_user(token, db)

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == user.id
    ).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"msg": "Deleted"}