




// a function escape plain text to special html
// if pattern match @user, then replace it with <a href="/user/:id">:name</a>
// if pattern match #map, then replace it with <a href="/map/:id">:name</a>
// if pattern match http(s)://, then replace it with <a href=":url">:url</a>
export const escapeHtml = (unsafe:string) => {
    return unsafe
          .replace(
            /(https?:\/\/[^\s]+)/g,
            `<a href='$1' class="break-words text-wrap cursor-pointer text-blue-600" target='_blank'>$1</a>`
          )
        .replace(/@(\w+)/g, `<a href='/user/$1' class="break-words cursor-pointer text-wrap text-blue-600">@$1</a>`)
        .replace(/#(\w+)/g, `<a href='/map/$1' class="break-words cursor-pointer text-wrap text-blue-600">#$1</a>`)
}