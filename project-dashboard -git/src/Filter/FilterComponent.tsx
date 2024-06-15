import { useContext, useEffect, useState } from 'react';
import './FilterComponent.css'
import Dropdown from '../Dropdown/DropdownComponent';
import MultiSelectDropdown from '../MultiSelectDropdown/MultiSelectDropdownComponent';
import { Button } from '@mui/material';
import { Category, Product, ProductListing } from '../api.interfaces';
import { RunReportCtx } from '../Home/HomeComponent';


function Filter() {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [productNames, setProductNames] = useState<string[]>([])
  const {categoryNames, setCategoryNames, selectedCategory, selectedProducts, setSelectedCategory, setSelectedProducts} = useContext(RunReportCtx)

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      console.log(result)
      return result;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const url = "https://dummyjson.com/products/categories";
    fetchData(url).then((result: Category[]) => {
      setCategories(result)
      const names = result.map((elem: Category) => elem.name)
      setCategoryNames(names)
    });
  }, []);


  useEffect(() => {
    if (selectedCategory) {
      const url = categories.find((category: any) => category.name === selectedCategory)?.url
      if(url) {
        fetchData(url).then((result: ProductListing) => {
          setProducts(result.products)
          const names = result.products.map((elem: Product) => elem.title)
          setProductNames(names)
        })
      }
    }
  }, [selectedCategory]);

  const handleCategoryChange = (selectedValue: string) => {
    setSelectedCategory(selectedValue);
  }

  const handleProductsChange = (selectedValue: string[]) => {
    const selectedProducts: Product[]= []
     products.forEach(product => {
      const selectedProduct = selectedValue.find(value => value === product.title)
      if(selectedProduct) {
        selectedProducts.push(product)
      } 
    })
    setSelectedProducts(selectedProducts)
  }


  return (
    <div className="filter">
      <div className='header'>
        <div className='title'>Filters</div>
        <div className='clearBtn'>
          <Button variant="text" onClick={
            () => {
              setSelectedCategory('');
              setSelectedProducts([])
            }
          }>Clear</Button>
        </div>

      </div>

      <div className='formFields'>
        <div className='category'>
          <Dropdown
            selectedState={selectedCategory}
            placeholder='Select Category'
            list={categoryNames}
            label='Category'
            handleSelectChange={handleCategoryChange}
          />
        </div>
        <div className='products'>
          <MultiSelectDropdown
           selectedState={selectedProducts}
            placeholder='Select Product'
            list={productNames}
            label='Product'
            disable={!selectedCategory}
            handleMultiSelectChange={handleProductsChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter