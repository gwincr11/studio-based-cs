import { expect, test } from '@playwright/test';

test('navigation paces the argument, reaches the final slide, and restarts', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#begin')).toBeEnabled();
  await expect(page.locator('#previous')).toBeDisabled();
  await page.getByRole('button', { name: 'Enter the studio' }).click();
  await expect(page.locator('#today')).toHaveClass(/present/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#site')).toHaveClass(/present/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#why-engineering')).toHaveClass(/present/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#why-engineering .fragment').first()).toHaveClass(/visible/);
  await expect(page.locator('#why-engineering')).toHaveClass(/present/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#why-engineering .fragment').last()).toHaveClass(/visible/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#why-studio')).toHaveClass(/present/);
  await page.keyboard.press('End');
  await expect(page.locator('#close')).toHaveClass(/present/);
  await expect(page.locator('#next')).toBeDisabled();
  const total = await page.locator('.slides > section').count();
  await expect(page.locator('#slide-number')).toHaveText(String(total).padStart(2, '0'));
  await page.getByRole('button', { name: 'Return to the beginning' }).click();
  await expect(page.locator('#belonging')).toHaveClass(/present/);
  await expect(page.locator('#slide-number')).toHaveText('01');
  expect(errors).toEqual([]);
});

test('course explanation follows the outline before the separate shared studio', async ({ page }) => {
  await page.goto('/');
  const sections = page.locator('.slides > section');
  expect(await sections.evaluateAll(slides => slides.map(slide => slide.id))).toEqual([
    'belonging', 'today', 'site', 'why-engineering', 'why-studio', 'ownership',
    'learning-evidence', 'course-arc', 'first-build', 'problem-introductions',
    'design-loop', 'understand', 'domain-modeling', 'ideation', 'prototypes',
    'validation', 'iterate', 'studio', 'studio-review', 'jury', 'scale',
    'decisions', 'adr', 'materials', 'qualities', 'throwing-curveballs', 'curveball-examples',
    'production', 'shipping', 'workshop', 'problem-briefs', 'studio-ideate', 'prototype',
    'pinup', 'curveball', 'constraint-architecture', 'geoffrey', 'swift', 'close',
  ]);
  await page.evaluate(() => { window.location.hash = '/workshop'; });
  await expect(page.locator('#workshop')).toHaveClass(/present/);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#problem-briefs')).toHaveClass(/present/);
});

test('course arc pairs teaching topics with studio activities in order', async ({ page }) => {
  await page.goto('/#/course-arc');
  await expect(page.locator('#next')).toBeEnabled();
  const table = page.getByRole('table', { name: 'Teaching topics and corresponding studio activities' });
  await expect(table.getByRole('columnheader')).toHaveText(['What is being taught', 'Studio component']);
  expect(await table.locator('tbody tr').evaluateAll(rows =>
    rows.map(row => [...row.querySelectorAll('td')].map(cell => cell.textContent)),
  )).toEqual([
    ['Building with AI', 'Build a small website.'],
    ['Agentic harnesses', 'Introduce the problems students will work on.'],
    ['Design thinking intro', 'Learn the process through a small in-class workshop.'],
    ['Understanding problems + domain modeling', 'Teams interview stakeholders, then map domain concepts and rules.'],
    ['Ideation techniques', 'Teams ideate in the problem space.'],
    ['Prototyping', 'Teams build prototypes.'],
    ['Validation', 'First studio: teams share work with stakeholders and class.'],
    ['Iteration introduced', 'Teams iterate on feedback.'],
    ['Software engineering materials', 'Teams choose a final approach.'],
    ['Quality attributes introduced', 'Teams gather quality attributes for their product.'],
    ['Attribute-driven design', 'Students choose materials based on attributes.'],
    ['Getting to production', 'Students build a real application and ship.'],
  ]);
});

test('studio teams exchange their own problems instead of selecting a prepared brief', async ({ page }) => {
  await page.goto('/#/problem-briefs');
  await expect(page.locator('#next')).toBeEnabled();
  const slide = page.locator('#problem-briefs');
  await expect(slide.getByRole('heading', { level: 2 })).toHaveText('Studio: Exchange Problems');
  await expect(slide.locator('.three-columns p')).toHaveText([
    'Everyone works in a team of 2. Find another team to work with.',
    'Discuss a real problem the other team has. Share a problem of your own, too.',
    "Today, each team will propose a solution to the other team's problem.",
  ]);
  await expect(slide.getByRole('button')).toHaveCount(0);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#studio-ideate')).toHaveClass(/present/);
  await expect(page.locator('#studio-ideate h2')).toHaveText('Studio: Ideate');
  await expect(page.locator('#studio-ideate a')).toHaveAttribute('href', 'https://www.luma-institute.com/creative-matrix/');
  await expect(page.locator('#studio-ideate tbody tr')).toHaveCount(3);
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#prototype')).toHaveClass(/present/);
  await expect(page.locator('#prototype .thesis-bar')).toContainText("Build for the other team's problem.");
});

test('material prompts support native keyboard activation', async ({ page }) => {
  await page.goto('/#/materials');
  await expect(page.locator('#next')).toBeEnabled();
  await expect(page.locator('#materials')).toHaveClass(/present/);
  const servers = page.getByRole('button', { name: 'Servers', exact: true });
  await servers.focus();
  await page.keyboard.press('Enter');
  await expect(servers).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('#material-title')).toHaveText('Where will the software live?');
  await expect(page.locator('#material-question')).toContainText('backups');
  await expect(page.locator('#materials')).toHaveClass(/present/);
});

test('curveballs carry from the exercise into architecture and cycle back', async ({ page }) => {
  await page.goto('/#/curveball');
  await expect(page.locator('#next')).toBeEnabled();
  await page.getByRole('button', { name: 'Reveal next condition' }).click();
  await expect(page.locator('#curveball-label')).toHaveText('DEVICES');
  await expect(page.locator('#curveball-title')).toHaveText('The club now needs this on phones.');
  await page.evaluate(() => { window.location.hash = '/constraint-architecture'; });
  await expect(page.locator('#constraint-architecture')).toHaveClass(/present/);
  await expect(page.locator('#architecture-condition')).toHaveText('The club now needs this on phones.');
  await expect(page.locator('#architecture-qualities')).toHaveText('Usability · Portability');
  await page.getByRole('button', { name: 'Technology banned', exact: true }).click();
  await expect(page.locator('#architecture-question')).toContainText('change the service');
  await page.evaluate(() => { window.location.hash = '/curveball'; });
  await expect(page.locator('#curveball')).toHaveClass(/present/);
  await expect(page.getByRole('button', { name: 'Technology banned', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Reveal next condition' }).click();
  await expect(page.locator('#curveball-title')).toHaveText('A package you depend on disappears.');
});

test('minimal chrome and overview work with reduced motion on mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('#next')).toBeEnabled();
  await expect(page.locator('.deck-header')).not.toContainText('FIELD NOTES');
  await expect(page.locator('.deck-header button')).toHaveCount(0);
  await page.keyboard.press('o');
  await expect(page.locator('.reveal')).toHaveClass(/overview/);
  await page.keyboard.press('o');
  await expect(page.locator('.reveal')).not.toHaveClass(/overview/);
  await expect(page.locator('.reveal')).toHaveClass(/\bnone\b/);
  await expect(page.locator('#belonging h1')).toBeInViewport();
  await expect(page.locator('#next')).toBeInViewport();
});

test('print view includes each slide once with its reveals visible', async ({ page }) => {
  await page.goto('/?print-pdf');
  await page.locator('.pdf-page').first().waitFor({ state: 'attached' });
  const total = await page.locator('section[data-title]').count();
  await expect(page.locator('.pdf-page')).toHaveCount(total);
  await expect(page.locator('#why-engineering .fragment').last()).toBeVisible();
  await expect(page.locator('#decisions .fragment').last()).toBeVisible();
});

test('slide content fits the presentation canvas on desktop and mobile', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#begin')).toBeEnabled();
  await page.evaluate(() => document.fonts.ready);
  const ids = await page.locator('.slides > section').evaluateAll(slides => slides.map(slide => slide.id));
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    await page.setViewportSize(viewport);
    for (const id of ids) {
      await page.evaluate(id => { window.location.hash = `/${id}`; }, id);
      const slide = page.locator(`#${id}`);
      await expect(slide).toHaveClass(/present/);
      const overflow = await slide.evaluate(section => {
        const bounds = section.getBoundingClientRect();
        return [...section.querySelectorAll('h1, h2, h3, p, button, table, .slide-note, .jury-audience')]
          .filter(element => !element.closest('.notes'))
          .filter(element => {
            const rect = element.getBoundingClientRect();
            return rect.bottom > bounds.bottom + 2 || rect.right > bounds.right + 2 || rect.left < bounds.left - 2;
          })
          .map(element => element.textContent?.trim());
      });
      expect(overflow, `${id} at ${viewport.width}px`).toEqual([]);
    }
  }
});
