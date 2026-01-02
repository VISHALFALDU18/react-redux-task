import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetch', async () => {
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    return data.products;
  });

  export const addProduct = createAsyncThunk('products/add', async (newproduct) => {
    const res = await fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newproduct),
    });
    const data = await res.json();
    return data;
  });

  export const updateProduct = createAsyncThunk('products/update', async (updatedProduct) => {
    try {
        if (!updatedProduct.id <= 100) {
            const res = await fetch(`https://dummyjson.com/products/${updatedProduct.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
            });
            const data = await res.json();
            return data;
        } else {
            return updatedProduct;
        }
    } catch (error) {
        console.error('Update Failed', error);
        return updatedProduct;
    }
  });

  export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
    await fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    });
    return id;
  });

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.items.unshift(action.payload);
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const index = state.items.findIndex((p) => p.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = {...state.items[index], ...action.payload };
                }
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.items = state.items.filter(p => p.id !== action.payload);
            });
    },
    
});

export default productSlice.reducer;