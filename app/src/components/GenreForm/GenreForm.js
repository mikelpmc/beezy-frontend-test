import React from 'react';

const BookForm = ({
    name,
    onSubmitGenre,
    handleChange,
    submitButtonText = 'Add Genre'
}) => {
    return (
        <form onSubmit={onSubmitGenre}>
            <div>
                <div className="field">
                    <label className="label">Name</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            placeholder="Enter a name"
                            value={name}
                            onChange={handleChange}
                            name="name"
                        />
                    </div>
                </div>

                <div className="control">
                    <button type="submit" className="button is-link is-rounded">
                        {submitButtonText}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default BookForm;
