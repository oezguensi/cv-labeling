from typing import Optional, Dict

from pydantic import BaseModel


class Operation(BaseModel):
    id: str
    name: str
    params: Optional[Dict[str, bool]]
    doc: str
