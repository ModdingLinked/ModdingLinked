import glob
import json
import os

DATA = [ "OS", "SystemRam", "GPUDriverVersion", "Processor", "GPU" ]

def process_capframex_file(json_path: str) -> None:
    with open(json_path, 'r', encoding='utf-8-sig') as file:
        data = json.load(file)

    info = data.get("Info")

    html_lines = ["<ul>"]
    for key in DATA:
        val = info.get(key)
            
        html_lines.append(f"    <li><strong>{key}:</strong> {val}</li>")
    
    html_lines.append("</ul>")

    sys_info_html = "\n".join(html_lines)

    output_html_path = os.path.splitext(json_path)[0] + ".html"
    with open(output_html_path, 'w', encoding='utf-8') as out_file:
        out_file.write(sys_info_html)

    print(f"Completed: {json_path} -> {output_html_path}")

if __name__ == "__main__":
    json_files = glob.glob("*.json")

    if not json_files:
        print("No JSON files found in the current directory.")
    else:
        print(f"Found {len(json_files)} JSON file(s). Processing...")
        for file_path in json_files:
            try:
                process_capframex_file(file_path)
            except Exception as e:
                print(f"Error processing {file_path}: {e}")
        print("Processing completed.")

    input("\nPress ENTER to close...")