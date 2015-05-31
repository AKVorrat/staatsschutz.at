#!/usr/bin/env python2
import databaseconnect
import settings
import itertools
import json

def dictfetchall(cursor):
    """Returns all rows from a cursor as a list of dicts"""
    cursor.execute("""select * from webform_submitted_data
	  WHERE sid in (select sid from webform_submitted_data WHERE cid=8 and data=1)
	  AND sid not in (SELECT sid FROM webform_confirm_email_code)
	  AND cid in (1,2,4,5,6) 
	  order by 1,2,3;""")
    desc = cursor.description
    return [dict(itertools.izip([col[0] for col in desc], row)) 
            for row in cursor.fetchall()]

if __name__ == "__main__":
	db = databaseconnect.connect(settings.DATABASE_URL)
	cursor = db.cursor()
	results = dictfetchall(cursor)
	with open("./js/signatures.json","wb") as f:
		json_results = json.dumps(results)
