import re
import os

html_path = r"c:\Users\Luis\Desktop\Lines\lines-core\index.html"
css_path = r"c:\Users\Luis\Desktop\Lines\lines-core\style.css"

with open(html_path, 'r', encoding='utf-8') as f:
    html_content = f.read()

# 1. Extract all <style> tags
style_pattern = re.compile(r'<style>(.*?)</style>', re.DOTALL | re.IGNORECASE)
styles = style_pattern.findall(html_content)

# Remove all <style> blocks from HTML
cleaned_html = style_pattern.sub('', html_content)

# 2. Replace hardcoded inline styles with utility classes
# Define regex replacements
replacements = [
    (r'style="padding:\s*0;\s*background:\s*var\(--color-bg-dark\);\s*border-bottom:\s*1px\s*solid\s*black;"', 'class="brutal-section-p0 bg-dark border-bottom-hard"'),
    (r'style="padding:\s*0;\s*background:\s*var\(--color-bg-dark\);?"', 'class="brutal-section-p0 bg-dark"'),
    (r'style="padding:\s*0;\s*position:\s*relative;\s*overflow:\s*hidden;\s*background:\s*var\(--color-bg-dark\);"', 'class="brutal-section-p0 bg-dark relative overflow-hidden"'),
    (r'style="padding:\s*0;\s*background:\s*var\(--color-bg-beige\);?"', 'class="brutal-section-p0 bg-beige"'),
    (r'style="padding:\s*0;\s*background:\s*var\(--color-bg-light\);\s*border-bottom:\s*1px\s*solid\s*black;"', 'class="brutal-section-p0 bg-light border-bottom-hard"'),
    (r'style="padding:\s*0;\s*background:\s*var\(--color-bg-light\);?"', 'class="brutal-section-p0 bg-light"'),
    (r'style="padding:\s*0;\s*overflow:\s*hidden;\s*background:\s*var\(--color-bg-light\);?"', 'class="brutal-section-p0 bg-light overflow-hidden"'),
    (r'style="padding:\s*0;\s*overflow:\s*hidden;?"', 'class="brutal-section-p0 overflow-hidden"'),
    # Find classes that were inside class="..." and add the new ones, or merge if they were separate.
    # Actually, the user's inline styles are directly on the sections: <section id="blog" class="brutal-section" style="...">
]

for old, new in replacements:
    # Need to merge the classes if there is already a class attribute.
    # We will do a simpler string replacement for the specific sections.
    pass

# Simpler literal replacements for index.html:
literal_replacements = {
    'class="brutal-section" style="padding: 0; background: var(--color-bg-dark); border-bottom: 1px solid black;"': 'class="brutal-section brutal-section-p0 bg-dark border-bottom-hard"',
    'class="brutal-section" style="padding: 0; overflow: hidden;"': 'class="brutal-section brutal-section-p0 overflow-hidden"',
    'class="brutal-section" style="padding: 0; position: relative; overflow: hidden; background: var(--color-bg-dark);"': 'class="brutal-section brutal-section-p0 bg-dark relative overflow-hidden"',
    'class="brutal-section" style="padding: 0; background: var(--color-bg-beige);"': 'class="brutal-section brutal-section-p0 bg-beige"',
    'class="brutal-section" style="padding: 0; background: var(--color-bg-light); border-bottom: 1px solid black;"': 'class="brutal-section brutal-section-p0 bg-light border-bottom-hard"',
    'class="brutal-section" style="padding: 0; overflow: hidden; background: var(--color-bg-light);"': 'class="brutal-section brutal-section-p0 bg-light overflow-hidden"'
}

for old, new in literal_replacements.items():
    cleaned_html = cleaned_html.replace(old, new)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(cleaned_html)

# 3. Append styles to CSS
with open(css_path, 'a', encoding='utf-8') as f:
    f.write("\n\n/* ─── COMPONENTES REFACTORIZADOS ────────────────────────────────── */\n")
    for s in styles:
        f.write(s)
        f.write("\n")

    # Add the utility classes
    f.write("""
/* ─── UTILITY CLASSES ──────────────────────────────────────────────────────── */
.bg-dark { background-color: var(--color-bg-dark) !important; color: var(--color-bg-light); }
.bg-light { background-color: var(--color-bg-light) !important; color: var(--color-bg-dark); }
.bg-beige { background-color: var(--color-bg-beige) !important; color: var(--color-bg-dark); }
.brutal-section-p0 { padding: 0 !important; }
.border-bottom-hard { border-bottom: 1px solid black !important; }
.relative { position: relative !important; }
.overflow-hidden { overflow: hidden !important; }
""")

print(f"Extracted {len(styles)} style blocks.")
