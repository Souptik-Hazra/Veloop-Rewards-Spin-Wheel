from PIL import Image
import sys

def remove_black_background(input_path, output_path, threshold=20):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # item is (R, G, B, A)
        # If the pixel is very dark (close to black), make it completely transparent
        if item[0] < threshold and item[1] < threshold and item[2] < threshold:
            newData.append((0, 0, 0, 0)) # transparent
        else:
            newData.append(item) # keep pixel

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent PNG to {output_path}")

if __name__ == "__main__":
    remove_black_background(sys.argv[1], sys.argv[2])
