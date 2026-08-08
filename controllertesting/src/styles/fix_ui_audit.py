import re

file_path = "/Users/divyyadav/final_tool/controllertesting/src/styles/global.css"
with open(file_path, "r") as f:
    content = f.read()

# Replace the purple colors
content = content.replace("124, 58, 237", "37, 99, 235")
content = content.replace("#7C3AED", "#2563EB").replace("#7c3aed", "#2563EB")

# Remove max-width blocks 1024 and 768 completely (but only the ones defining grid layouts)
# We can just delete the specific responsive utilities section manually using string replace.
responsive_start = content.find("/* ============================================================\n   RESPONSIVE UTILITIES\n   ============================================================ */")
if responsive_start != -1:
    print("Found responsive section.")
    # Keep the root spacing in 768px block if needed, but it's easier to rewrite the whole section.
    
    # We will just replace all grid-actions etc with standard mobile first logic.
    # It's safer to just replace `.grid-actions` base definition.
    pass
    
# Let's fix the grid actions manually using exact strings
old_actions = """.grid-actions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-gap);
}"""

new_actions = """.grid-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-gap);
}
@media (min-width: 640px) {
  .grid-actions { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid-actions { grid-template-columns: repeat(3, 1fr); }
}"""

old_related = """.grid-related {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-gap);
}"""
new_related = """.grid-related {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-gap);
}
@media (min-width: 640px) {
  .grid-related { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid-related { grid-template-columns: repeat(4, 1fr); }
}"""

old_content = """.grid-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-gap);
}"""
new_content = """.grid-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-gap);
}
@media (min-width: 640px) {
  .grid-content { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid-content { grid-template-columns: repeat(3, 1fr); }
}"""

content = content.replace(old_actions, new_actions)
content = content.replace(old_related, new_related)
content = content.replace(old_content, new_content)

# Now delete the bad max-width overrides that will conflict
to_remove = """@media (max-width: 1024px) {
  .grid-actions {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-related {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  :root {
    --spacing-section: 3rem;
    --spacing-card-lg: 1.25rem;
    --spacing-card: 1rem;
  }

  .grid-actions {
    grid-template-columns: 1fr;
  }
  .grid-related {
    grid-template-columns: repeat(2, 1fr);
  }
  .grid-content {
    grid-template-columns: 1fr;
  }
}"""

new_responsive = """@media (max-width: 768px) {
  :root {
    --spacing-section: 3rem;
    --spacing-card-lg: 1.25rem;
    --spacing-card: 1rem;
  }
}"""

content = content.replace(to_remove, new_responsive)

with open(file_path, "w") as f:
    f.write(content)
print("Fixes applied successfully.")
