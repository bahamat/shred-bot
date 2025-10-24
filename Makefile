NVM_DIR=nvm

.PHONY: all nvm clean

all: nvm/nvm.sh
	npm install

nvm: nvm/nvm.sh
nvm/nvm.sh:
	[[ -d nvm ]] || mkdir nvm
	curl --progress-bar -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
	source $@ ; npm install --lts

clean:
	rm -rf node_modules package-lock.json
