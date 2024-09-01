export const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPostsFromAPI = async (page, limit) => {
    const response = await fetch(`${API_URL}?_page=${page}&_limit=${limit}`);
    if (!response.ok) throw new Error("Failed to load posts");
    return response.json();
};

export const addPostToAPI = async (newPost) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
    });
    if (!response.ok) throw new Error("Error adding post");
    return response.json();
};

export const updatePostInAPI = async (postId, updatedPost) => {
    const response = await fetch(`${API_URL}/${postId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
    });
    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating post: ${response.status} - ${errorText}`);
    }
    return response.json();
};

export const deletePostFromAPI = async (postId) => {
    const response = await fetch(`${API_URL}/${postId}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete post");
};