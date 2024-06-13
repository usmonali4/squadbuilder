export default function Button({children, ...props}) {
    return <button className="px-4 py-2
            text-xs md:text-base rounded-md
            bg-stone-900 text-stone-50 hover:bg-stone-500
            hover:text-stone-200" {...props}
    >{children}
    </button>
}