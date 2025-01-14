interface TagProps {
    img?: string | null;
    text: string;
    color: string;
    bgColor: string;
}

export default function Tag({img, text, color, bgColor} : TagProps) {
    return (
        <div className={`tag bg-${bgColor} c-${color}`}>
            {
                img && <img src={img} alt={text} />
            }
            {text}
        </div>
    )
}