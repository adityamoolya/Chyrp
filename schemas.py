from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import List, Optional

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    role: str = "viewer"

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool

    class Config:
        orm_mode = True

# Authentication Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# Category Schemas
class CategoryBase(BaseModel):
    name: str
    description: Optional[str] = None

class CategoryCreate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    class Config:
        from_attributes = True

# Tag Schemas
class TagBase(BaseModel):
    name: str

class TagCreate(TagBase):
    pass

class Tag(TagBase):
    id: int

    class Config:
        orm_mode = True

# Comment Schemas
class CommentBase(BaseModel):
    content: str

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    author: User
    created_at: datetime

    class Config:
        orm_mode = True

# Blog Schemas
class BlogBase(BaseModel):
    title: str
    content: str
    content_type: str = "text"
    content_format: str = "text"
    published: bool = True
    category_id: Optional[int] = None

class BlogCreate(BlogBase):
    tags: List[str] = []

class Blog(BlogBase):
    id: int
    author: User
    category: Optional[Category] = None
    tags: List[Tag] = []
    comments: List[Comment] = []
    views: int
    likes_count: int = 0
    created_at: datetime
    updated_at: Optional[datetime] = None
    media_path: Optional[str] = None

    class Config:
        orm_mode = True

# Like Schema
class Like(BaseModel):
    id: int
    user: User
    blog_id: int

    class Config:
        orm_mode = True