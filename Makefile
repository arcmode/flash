
build: components index.js flash.css
	@component build --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components
.PHONY: clean
