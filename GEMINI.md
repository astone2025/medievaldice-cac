# Medieval Dice (CAC) - Project Instructions

## Project Overview
This project is a digital scholarly edition of the Middle English poem **"The Chaunce of the Dyse"**, specifically optimized for the CUNY Academic Commons (WordPress) environment. It employs TEI XML for transcription and semantic encoding, alongside highly specialized HTML and CSS for high-fidelity web presentation.

### Core Technologies
- **TEI XML:** Source transcription following TEI Lite guidelines.
- **HTML5:** Semantic output using a "flat sibling structure" to facilitate CSS-only automation.
- **CSS3:** Advanced usage of CSS Counters, `:target` selectors, and responsive fluid typography (`clamp()`).
- **Target Platform:** CUNY Academic Commons (WordPress).

## Directory Structure
- `tei/`: Contains the primary source transcription (`wp-hammond-transcription-tei.xml`).
- `html/`: Static HTML exports of the poem for reference and archival purposes.
- `css/`: Central stylesheets including general layout and specialized responsiveness.
- `full-poem-w-dice-illustration/`: Contains the high-fidelity parallel edition with SVG dice illustrations and optimized grid layout.
- Root: Contains specialized CSS snippets and corresponding HTML fragments (`.txt` files) for WordPress insertion.

## Engineering Standards & Conventions

### 1. Semantic Mapping
All web presentation must map strictly to TEI semantics using the `tei-` prefix:
- `<lg>` (Stanza/Group) → `.tei-stanza` or `.tei-poem-static`
- `<l>` (Line) → `.tei-line`
- `<head>` (Heading) → `.tei-head`
- `<pb>` (Page Break) → `.tei-pb`

### 2. Parallel Layout (Side-by-Side)
For dual-column editions (e.g., ME and ModE), use a strict grid container:
- **Wrapper:** `.tei-side-by-side-wrapper` with `display: grid` and `grid-template-columns: 1fr 1fr`.
- **Spacing:** Set `gap: 0` and use padding on `.tei-poem-static` to ensure a seamless "unified block" appearance.
- **Alignment:** Force single-line verses using `white-space: nowrap` to maintain structural parity between columns.

### 3. Visual Dice Illustrations
Dice rolls are rendered visually using inline SVG background images on pseudo-elements:
- **Encoding:** Use `data-roll="N"` on the `.tei-dice` span.
- **Rendering:** CSS `::before` pseudo-elements display the corresponding SVG dice face.
- **Clustering:** Arrange three dice in a stanza into an equilateral triangle cluster using precise `top` and `left` staggering relative to the `.tei-stanza` anchor.

### 4. Automated Line Numbering
Due to JavaScript restrictions on CUNY Academic Commons, line numbering **must** be implemented using either pure CSS Counters or static markers:
- **Positioning:** Pin line numbers to a fixed vertical axis (`right: 1.5em`) on the far right of the column to prevent overlap with verse text.
- **ME/ModE Sync:** In parallel editions, hide line numbers in the ME column and display them exclusively in the ModE column to reduce visual clutter while maintaining count.

## Responsive Poetry Layout
- **Centering:** For mobile, left-justified poem blocks must be centered as a unit using the `display: table; margin: auto;` method (Shrink-to-fit).
- **Typography:** Use `clamp(min, preferred, max)` for fluid font scaling to prevent line-wrapping on small screens while maintaining readability.
- **Interaction:** Dice-roll results and stanza reveals are handled via the CSS `:target` pseudo-class (linked via element IDs) to avoid JavaScript dependencies.


### 4. Code Maintenance
- **WordPress Integration:** When generating HTML for the site, use `.txt` files to store snippets. Avoid invalid HTML comments (use standard `--` instead of fancy dashes).
- **Specificity:** Use `!important` judiciously to ensure styles successfully override WordPress theme defaults.

## Usage
- **Transformation:** The TEI XML is the single source of truth. Updates to text or numbering should begin there before being propagated to the HTML/CSS fragments.
- **deployment:** Copy the contents of `.txt` snippets into WordPress "Custom HTML" blocks and the contents of `.css` files into the WordPress "Additional CSS" customizer.
