# Formatting Guidelines

## Images
- All images must be `.webp` format and placed in the matching folder for the page or section.
- Convert images using [libwebp](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/index.html) with these PowerShell scripts (compressed for most images, uncompressed for images where detail needs to be preserved, such as comparisons):  
  `Get-ChildItem *.png | ForEach-Object { cwebp -q 80 -m 6 $_.Name -o ($_.BaseName + ".webp") }`  
  `Get-ChildItem *.png | ForEach-Object { cwebp -lossless $_.Name -o ($_.BaseName + ".webp") }`
- MO2 screenshots must use the default theme.

## Grammar & Style
- Use American English.
- Use punctuation everywhere except in file name lines (e.g., "Main Files") and FOMOD steps.
- Instruction lists end with a full stop.
- Lists of single items end with a comma, then a full stop at the last entry.
- List entries ending in spans (e.g., `<span>`) should not have punctuation.
- Avoid first-person singular ("I"); use "we" or generalize information.

## Highlighting
- **Strong** (`<strong>`) is reserved for words that are critical to the section or instructions, or that summarize them at a glance.
- **Bold** (`<b>`) is for terms such as folder names (Root), prompts, or buttons users will see.  
  **Exceptions:**  
  - "You can NOT skip any paragraphs/instructions and expect your game to function as it should."
  - "In Installation Location select an empty folder that is NOT the following:"
  - "Moved x to the new section."
- **Underline** (`<u>`) is for words often missed by users, serving as a subtle highlight below strong/bold.

## Note Cards
- **Basic cards**: For paths, text to copy, formulas (e.g., VRR bias).
- **Green cards**: Info that can be safely ignored.
- **Yellow cards**: Info the user should be aware of.
- **Red cards**: Info that, if ignored, causes bugs, crashes, or wasted time.
- **Coco Nerd**: Only for "Everything in this guide is written down for a reason!" in Introduction and Wabbajack pages.
- Only center when critical or in-between cards.

## Mods
- Rewrite mod descriptions if they're not clear enough or are written incorrectly.
- If extra files are needed from external pages, link the page first, then the file as a sublist.
- FOMOD instructions: Use an ordered list with exact entries and buttons to click for each step.  
  - Do not add punctuation to FOMOD step entries.
  - Omit defaults unless it relies on auto-detection (the user might still have the required mod disabled.)

## Changelog
- Use `DD/MM/YY` format for dates in Markdown, and "Month Day" (e.g., "August 9") in HTML.
- Each year is wrapped in an expander in HTML.
- Each change is a `<li>` with a clear action verb:
  - "Added" for new content
  - "Removed" for deleted content
  - "Replaced X with Y" for substitutions
  - "Updated" for version changes
  - "Fixed" for corrections
  - "Moved X to Y section" for reorganization
- Use nested lists for multiple items.
- Separate entries with `<hr>` between dates in HTML.
- Specify mid-game safety if relevant:
  - "Safe Mid-Game"
  - "NOT Safe Mid-game (Unless...)" (add reason if needed)
- Log all entries except:
  - Formatting changes that do not invalidate previous instructions.
  - Information rewrites that do not invalidate previous instructions.
  - Wabbajack reuploads due to minor errors (e.g., versioning).
  - Load order changes unless critical.
  - Changes to avoid pages (use "Updated information." under Whole Guide if enough changes).
- If an operation (added/updated/removed) is done multiple times, use a list.
- If necessary, add a justification for an operation after the mod name, separated by a comma.
- If moving a mod:
  - Title as the old section,
  - "Moved x to the new section" (bold).
- Wabbajack mod update lists use the full mod name. Other log entries may shorten it.

## HTML/Website Specifics
- Section headers use `<h2><strong>Section Name</strong></h2>`.
- Standard sections (in order):  
  Whole Guide, Setup, MO2, Utilities, Bug Fixes, User Interface, Gameplay, Content, Overhauls, Visuals, Extended Finish, LOD Guide, FAQ, Resources, Wabbajack.
- Use `<ul>` for lists, `<ol>` for ordered steps.
- Use `<div class="card-[color]">` for note cards.
- Use `<span class="card-basic">` for paths or text to copy.
- Use `<img class="mo2-icon">` for MO2 icons.
- Use `<a>` for links, always open external links in a new tab (`target="_blank"`).
