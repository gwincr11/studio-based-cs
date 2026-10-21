from pydantic import BaseModel, ConfigDict, Field


class NewMessage(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True, strict=True, extra="forbid")

    text: str = Field(min_length=1, max_length=200)
