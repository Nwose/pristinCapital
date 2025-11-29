install:
	@echo "Installing the application..."
	bun install

runserver:
	bun run dev

diff:
	git add -N .
	git diff > a.diff
	code a.diff
	rm a.diff
	git add .
	git commit
	git push