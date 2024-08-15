run-dev-up:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -d
run-dev-rebuild:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	up -dV --build
run-dev-down:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down
run-dev-down-hard:
	docker compose \
	-f docker-compose.yml -f docker-compose.dev.yml \
	down -v

# test
run-test-up:
	docker compose \
	-f docker-compose.yml -f docker-compose.test.yml \
	up --abort-on-container-exit --build -V; \
	make run-test-down
run-test-down:
	docker compose \
	-f docker-compose.yml -f docker-compose.test.yml \
	down -v
run-test:
	docker exec -it app-dev-server-1 \
	bash -c "ENVIRONMENT=test npm run test"
