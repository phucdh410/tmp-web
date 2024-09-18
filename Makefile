build_command = 
	docker build --no-cache . -t registry-gitbit.vtcode.vn:9443/icool-tpm/web --platform linux/amd64 && \
	docker push registry-gitbit.vtcode.vn:9443/icool-tpm/web

build:
	$(build_command)
