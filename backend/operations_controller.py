import inspect
import re
from uuid import uuid4

import cv2
from fastapi import APIRouter

from operation_model import Operation

router = APIRouter(prefix="/api/v1/operations", tags=["operations"])

funcs = [cv2.medianBlur, cv2.HoughCircles, cv2.cvtColor, cv2.threshold]


@router.get("/")
def get_operations():
    operations = []
    for func in funcs:
        doc = inspect.getdoc(func)
        signature = doc.split('\n')[0]
        name = signature.split('(', 1)[0]
        doc = doc.split('@brief ')[1]
        
        params = {}
        required_params_txt, optional_params_txt = re.search(r'\((.*)\)', signature).group(0)[1:-1].split('[', 1)
        
        for param in required_params_txt.split(', '):
            if param.strip() != '':
                params[param] = True
        for param in optional_params_txt.replace('[', '').replace(']', '').split(', '):
            if param.strip() != '':
                params[param] = False
        
        operations.append(Operation(id=str(uuid4()), name=name, params=params, doc=doc))
    
    return operations
