import { Input } from '@/components/ui/input';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from './FieldEdit';

const FormUi = ({ form }) => {
  console.log(form);

  return (
    <div className='border p-5 md:w-[600px] rounded-lg'>
      <h2 className='font-bold text-center text-2xl'>{form?.formTitle}</h2>
      <h2 className='text-sm text-gray-400 text-center font-semibold'>{form?.formSubheading}</h2>
      {form?.fields?.map((field, index) => (
       <div className='flex items-center '>
        <div className='my-3 w-full' key={index}>
          {field.fieldType === 'select' ? (
            <Select className="outline border border-black">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((item, idx) => (
                  <SelectItem value={item} key={idx}>{item}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.fieldType === "radio" ? (
            <div className='my-3 w-full'>
              <label className='text-xs text-gray-500'>{field.fieldLabel}</label>
              <RadioGroup defaultValue="option-one">
                {field.options.map((option, idx) => (
                  <div className="flex items-center space-x-2" key={idx}>
                    <RadioGroupItem value={option.label} id={option.label} />
                    <Label htmlFor={option.label}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType === "checkbox" ? (
            <div className='my-3 w-full'>
            <label className='text-xs text-gray-500'>{field.fieldLabel}</label>
              <div>
                {field.options.map((item, idx) => (
                  <div className='flex gap-2' key={idx}>
                    <Checkbox />
                    <h2>{item.label}</h2>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className='my-3 w-full'>
              <label className='text-xs text-gray-500'>{field.label}</label>
              <Input type={field?.fieldType} placeholder={field.placeholder} name={field.name} className="border border-gray-400" />
            </div>
          )}
        </div>
        <div>
          <FieldEdit defaultValue={field}/>
        </div>
        </div> 
      ))}
    </div>
    
  );
}

export default FormUi;
