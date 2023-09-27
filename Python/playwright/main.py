import os
from playwright.sync_api import Playwright, sync_playwright


def run(playwright: Playwright, dir) -> None:
    browser = playwright.chromium.launch(headless=False)
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://playwright.dev/")
    page.screenshot(path=f"{dir}example.png")
    context.close()
    browser.close()


output_dir = "./out/"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

with sync_playwright() as playwright:
    run(playwright, output_dir)
