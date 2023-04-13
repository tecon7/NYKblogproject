import {useState} from 'react';

function CommentForm ({handleSubmit, submitLabel, handleCancel, hasCancelButton = false, initialText = ''}) {
    const [text, setText] = useState(initialText);
    const isDisabled = text.length === 0;
    const onSubmit = event => {
        event.preventDefault()
        handleSubmit(text)
        setText('')
    }
    return (
        <form classname="comment-form" onSubmit={onSubmit}>
            <textarea className="comment-form-textarea"
             value={text} 
             onChange={event => setText(event.target.value)}
            />
            <button className="comment-form-button" disabled={isDisabled}>{submitLabel}</button>
            {hasCancelButton && (
                <button type="button"
                 className='comment-form-button comment-form-cancel-button' 
                 onClick={handleCancel}>
                    Cancel
                 </button>
            )}
        </form>
    )
}
export default CommentForm 