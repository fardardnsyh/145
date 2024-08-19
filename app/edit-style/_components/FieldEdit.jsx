"use client";
import { Delete, Edit } from 'lucide-react'
import { Trash } from 'lucide-react';
import React, { useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Input } from '@/components/ui/input'
  

const FieldEdit = ({defaultValue,onUpdate}) => {
    const[label,setLabel] = useState();
    const[placeholder,setPlaceholder] = useState();
  return (
    <div className='flex gap-2'>
    <Popover>
     <PopoverTrigger><Edit className='h-5 w-5 text-gray-500' /></PopoverTrigger>
     <PopoverContent>
        <h2>Edit Fields</h2>
        <div>
            <label className='text-xs'>Label Name</label>
            <Input defaultValue={defaultValue.label} onChange={(e)=>setLabel(e.target.value)}/>
        </div>
        <div>
            <label className='text-xs'>Placeholder Name</label>
            <Input defaultValue={defaultValue.placeholder} onChange={(e)=>setPlaceholder(e.target.value)}/>
        </div>
        <Button size="sm" onClick={()=>onUpdate({
            label:label,
           placeholder:placeholder
        })} className="mt-3">
           Update
        </Button>
     </PopoverContent>
    </Popover>
    
    <Trash className='h-5 w-5 text-red-500'/>
    </div>
  )
}

export default FieldEdit