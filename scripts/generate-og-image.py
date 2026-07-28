from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


WIDTH = 1200
HEIGHT = 627
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "og-image-2.jpg"

INK = "#193036"
SOFT = "#4D6267"
PAPER = "#FBF8EF"
ORANGE = "#D94720"
LINE = "#B8C9CA"
STRIP = ["#2F747D", "#C77D25", "#62804E", "#90506C", "#3E6191", "#B3423E"]

REGULAR = Path(r"C:\Windows\Fonts\segoeui.ttf")
BOLD = Path(r"C:\Windows\Fonts\segoeuib.ttf")


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def pill(draw: ImageDraw.ImageDraw, x: int, y: int, text: str, colour: str) -> int:
    text_font = font(BOLD, 21)
    box = draw.textbbox((0, 0), text, font=text_font)
    width = box[2] - box[0] + 34
    draw.rounded_rectangle((x, y, x + width, y + 45), radius=7, fill=colour)
    draw.text((x + 17, y + 9), text, font=text_font, fill="white")
    return x + width + 12


def main() -> None:
    image = Image.new("RGB", (WIDTH, HEIGHT), PAPER)
    draw = ImageDraw.Draw(image)

    segment_width = WIDTH // len(STRIP)
    for index, colour in enumerate(STRIP):
        x1 = index * segment_width
        x2 = WIDTH if index == len(STRIP) - 1 else (index + 1) * segment_width
        draw.rectangle((x1, 0, x2, 15), fill=colour)

    draw.text((60, 58), "The Amalgamator", font=font(BOLD, 70), fill=INK)
    draw.text((60, 147), "Build a bigger council.", font=font(BOLD, 38), fill=INK)
    draw.text(
        (60, 203),
        "Choose councils. Compare population, rates and net assets.",
        font=font(REGULAR, 27),
        fill=SOFT,
    )

    x = 60
    x = pill(draw, x, 271, "Winterless Council", STRIP[0])
    x = pill(draw, x, 271, "Sunrise Coast", STRIP[1])
    x = pill(draw, x, 271, "Wellington metro", STRIP[2])
    pill(draw, x, 271, "Aoraki Council", STRIP[3])

    draw.text(
        (60, 365),
        "See who lives where — and how published",
        font=font(BOLD, 31),
        fill=INK,
    )
    draw.text(
        (60, 407),
        "average residential rates compare.",
        font=font(BOLD, 31),
        fill=INK,
    )

    draw.line((60, 485, 1140, 485), fill=INK, width=2)
    draw.text(
        (60, 508),
        "Indicative modelling · data current to 28 July 2026",
        font=font(REGULAR, 22),
        fill=SOFT,
    )
    draw.text((60, 553), "amalgamator.nz", font=font(BOLD, 30), fill=ORANGE)

    image.save(OUTPUT, format="JPEG", quality=94, subsampling=0, optimize=True)
    print(f"Wrote {OUTPUT} ({image.width} × {image.height})")


if __name__ == "__main__":
    main()
