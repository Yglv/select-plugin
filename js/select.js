const getTemplate = (data = [], placeholder, selectedId) =>{
  let text = placeholder ?? 'Выбери элемент'
  let cls = ''
  const items = data.map(item =>{
    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>`
  })
  return `
  <div class="select__input" data-type = "input">
    <span data-type="value">${text}</span>
    <i class="fa-sharp fa-solid fa-chevron-down" data-type = "arrow"></i>
  </div>
  <div class="select__dropdown">
    <ul class="select__list">
      ${items.join('')}
    </ul>
  </div>`
}

export class Select {
  constructor(selector, options) {
    this.element = document.querySelector(selector)
    this.options = options
    this.selectedId = options.selectedId

    this.#render()
    this.#setup()
  }

  #render() {
    const {placeholder, data} = this.options
    this.element.classList.add('select')
    this.element.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this)
    this.element.addEventListener('click',this.clickHandler)
    this.arrow = this.element.querySelector('[data-type = "arrow"]')
    this.value = this.element.querySelector('[data-type = "value"]')
  }

  clickHandler(event) {
    const {type} = event.target.dataset
    if (type === 'input') {
      this.toggle()
    }else if (type === 'item') {
      const id = event.target.dataset.id
      this.select(id)
    }
  }

  get isOpen() {
    return this.element.classList.contains('open')
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId)
  }

  select(id) {
    this.selectedId = id
    this.value.textContent = this.current.value
    this.element.querySelectorAll('[data-type="item"]').forEach(item => {
      item.classList.remove('selected')
    });
    this.element.querySelector(`[data-id="${id}"]`).classList.add('selected')
    this.close()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  open() {
    this.element.classList.add('open')
    this.arrow.classList.remove('fa-chevron-down')
    this.arrow.classList.add('fa-chevron-up')
  }

  close() {
    this.element.classList.remove('open')
    this.arrow.classList.remove('fa-chevron-up')
    this.arrow.classList.add('fa-chevron-down')
  }

  destroy() {
    this.element.removeEventListener('click',this.clickHandler)
    this.element.innerHTML = ''
  }
}