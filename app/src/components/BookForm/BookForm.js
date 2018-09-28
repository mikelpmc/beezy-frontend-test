import React from 'react';

const BookForm = ({
    title,
    price,
    handleChange,
    renderSelectGenres,
    onSubmitBook,
    submitButtonText = 'Add Book'
}) => {
    return (
        <form onSubmit={onSubmitBook}>
            <div>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="text"
                            placeholder="Enter a title"
                            value={title}
                            onChange={handleChange}
                            name="title"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Price</label>
                    <div className="control">
                        <input
                            className="input is-rounded"
                            type="number"
                            placeholder="Enter a price"
                            value={price}
                            onChange={handleChange}
                            name="price"
                        />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Genre</label>
                    <div className="control">{renderSelectGenres()}</div>
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
