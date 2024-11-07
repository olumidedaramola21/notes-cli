const htmlTemplate = "<h1>Hello, {{name}}!</h1><p>Your age is {{ age }}. </p>"
const data = {
    name: "sade",
    age: 30
}

const interpolate = (html, data) => {
    return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
      return data[placeholder] || '';
    })
  }

const result = interpolate(htmlTemplate, data)
console.log(result)
