build_command = docker build --no-cache -t phuonglk/icool-tpm-web --platform linux/amd64 . && \
	docker push phuonglk/icool-tpm-web

build:
	$(build_command)
