from pathlib import Path
from PIL import Image, ImageOps
import shutil
src=Path('/mnt/data'); root=Path(__file__).parent;media=root/'public/media'
photos={
 'portrait-main':'IMG_20260313_194507_592.jpg',
 'portrait-side':'IMG_20260313_194508_160.jpg',
 'portrait-outdoors':'IMG_20260313_215215_4478.jpg',
 'huawei-award':'DSC02568.jpg',
 'huawei-stage':'DSC02571.jpg',
 'huawei-team':'DSC02578.jpg',
 'huawei-team-wide':'DSC02772.jpg',
 'ict-day':'IMG_6437.JPG.jpeg',
 'ict-day-alt':'IMG_20260313_194508_142.jpg',
 'university-pedagogy':'IMG_20260415_191318_088.jpg',
 'community-photo':'IMG_20260312_140108_139.jpg',
 'recognition-ceremony':'IMG_20260213_110458_821.jpg',
 'recognition-ceremony-2':'IMG_20260213_111432_645.jpg',
 'university-plaque':'IMG-20260213-WA00111.jpg'
}
certs={
 'huawei-appreciation':'IMG-20260902-WA0003.jpg',
 'itcp-coach':'IMG-20260902-WA0006.jpg',
 'tech-recognition':'IMG-20260902-WA0008.jpg',
 'pedagogical-ai':'IMG-20260902-WA0001.jpg',
 'workshop-registration':'IMG-20260902-WA0004.jpg',
}
for name,fn in photos.items():
 im=ImageOps.exif_transpose(Image.open(src/fn)).convert('RGB')
 im.thumbnail((1800,1800),Image.Resampling.LANCZOS)
 im.save(media/'photos'/f'{name}.webp',format='WEBP',quality=84,method=6)
for name,fn in certs.items():
 im=ImageOps.exif_transpose(Image.open(src/fn)).convert('RGB')
 # Images were photographed in portrait mode with their printed text rotated 90 degrees.
 # Rotate for comfortable reading in the portfolio certificate viewer.
 im=im.rotate(90,expand=True)
 im.thumbnail((1600,1600),Image.Resampling.LANCZOS)
 im.save(media/'certificates'/f'{name}.webp',format='WEBP',quality=88,method=6)
shutil.copy(src/'main.svg',root/'public/brand/logo-dark.svg')
svg=(src/'main.svg').read_text()
svg=svg.replace('fill: #323330;', 'fill: #f0f4f7;')
(root/'public/brand/logo-light.svg').write_text(svg)
shutil.copy(src/'Bouchachi_Mohamed_Mehdi_CV_Updated.pdf',root/'public/resume/Bouchachi-Mohamed-Mehdi-CV.pdf')
print('Prepared',len(photos),'photos',len(certs),'certificates')
