#!/usr/bin/env python3
"""Download freely licensed destination photos from Wikimedia Commons.
Metadata and attribution saved alongside each photo. Requires network access.
"""
import json, os, urllib.parse, urllib.request
from pathlib import Path
destinations = {
 "granada.jpg": "Granada Nicaragua colonial street",
 "ometepe.jpg": "Ometepe Nicaragua volcano",
 "corn-islands.jpg": "Corn Islands Nicaragua beach",
 "san-juan.jpg": "San Juan del Sur Nicaragua sunset",
}
out=Path("public/images");out.mkdir(parents=True,exist_ok=True)
headers={"User-Agent":"OroTravelMotionStudio/1.0 (GitHub Actions video builder)"}
credits={}
for filename,query in destinations.items():
 if (out/filename).is_file() and (out/filename).stat().st_size>10000:
  continue
 api="https://commons.wikimedia.org/w/api.php"
 params={"action":"query","generator":"search","gsrsearch":query+" filetype:bitmap","gsrnamespace":"6","gsrlimit":"15","prop":"imageinfo","iiprop":"url|extmetadata|mime","iiurlwidth":"1200","format":"json"}
 req=urllib.request.Request(api+"?"+urllib.parse.urlencode(params),headers=headers)
 with urllib.request.urlopen(req,timeout=35) as response: data=json.load(response)
 candidates=[]
 for page in data.get("query",{}).get("pages",{}).values():
  info=page.get("imageinfo",[{}])[0]
  if info.get("mime") in ("image/jpeg","image/png") and info.get("thumburl"):
   candidates.append((page,info))
 if not candidates: raise RuntimeError("No downloadable Commons photo found for "+query)
 page,info=sorted(candidates,key=lambda p:len(p[0]["title"]))[0]
 req=urllib.request.Request(info["thumburl"],headers=headers)
 with urllib.request.urlopen(req,timeout=45) as response: content=response.read()
 if len(content)<10000: raise RuntimeError("Downloaded image too small: "+filename)
 (out/filename).write_bytes(content)
 credits[filename]={"source":info.get("descriptionurl"),"title":page["title"],"license":info.get("extmetadata",{}).get("LicenseShortName",{}).get("value","See source"),"artist":info.get("extmetadata",{}).get("Artist",{}).get("value","See source")}
 print("Downloaded",filename,len(content),"bytes",credits[filename]["source"])
Path("public/images/ATTRIBUTION.json").write_text(json.dumps(credits,indent=2))
