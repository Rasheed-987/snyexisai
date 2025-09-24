---
applyTo: '**'
# Styling & Layout Instruction for GitHub Copilot

We have a reference design from Figma (image + layout).  
Goal: Recreate the element’s exact look & layout in **responsive Tailwind CSS**.

### Requirements:
1. **Pixel-Perfect Layout**
   - Match the provided Figma spacing, alignment, and typography.
   - Each section should be built using **semantic div structure**.

2. **Responsive Design**
   - Mobile (sm), Tablet (md), Desktop (lg & xl) must adapt fluidly.
   - Use Tailwind’s responsive classes (`sm:`, `md:`, `lg:`) to adjust sizes, padding, margins, and font scales.
   - Avoid fixed pixel widths for main containers; prefer `max-w`, `w-full`, `flex`, `grid`, and `%`-based layouts.

3. **Typography & Fonts**
   - Use the provided custom font (`Chillax`) + fallback `sans-serif`.
   - Heading text should scale across breakpoints (e.g., `text-3xl sm:text-5xl lg:text-7xl`).
   - Apply tracking/letter spacing exactly as in Figma.

4. **Color & Background**
   - Use exact colors from Figma (hex values).
   - Ensure proper contrast on text and backgrounds.
   - If background sections overlap, use `relative`, `absolute`, or `z-index` as in design.

5. **Spacing & Sizing**
   - Follow Figma’s paddings/margins.
   - Use `flex` / `grid` for alignment instead of excessive manual margins.
   - Ensure content stays centered and doesn’t overflow on smaller screens.

6. **Structure**
   - Write **every div** explicitly with proper nesting.
   - Example hierarchy:
     ```html
     <div class="main-container">
       <div class="header">...</div>
       <div class="content">...</div>
       <div class="footer">...</div>
     </div>
     ```
   - Use descriptive class names when Tailwind’s utility-first approach is insufficient.

7. **Accessibility**
   - Text should remain legible at all breakpoints.
   - Ensure semantic tags where appropriate (`header`, `main`, `footer`).

---

