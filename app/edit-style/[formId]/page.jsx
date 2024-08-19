"use client";
import { db } from '@/configs';
import { forms } from '@/configs/schema';
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FormUi from '../_components/FormUi';
import { and, eq } from 'drizzle-orm';

const EditForm = ({ params }) => {
  const { user } = useUser();
  const [form, setForm] = useState([]);
  const router = useRouter();

  const GetFormData = async () => {
    console.log("Working Fine");
    try {
      // Ensure user and email are available
        const result = await db
          .select()
          .from(forms)
          .where(
            and(
              eq(forms.id, params?.formId),
            )
          );

          setForm(JSON.parse(result[0].jsonform));
          console.log("result:", result[0].jsonform);
        }
        catch(error){
            console.log(error);
        }
  };

  useEffect(() => {
    GetFormData();
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold">
        <ArrowLeft onClick={() => router.back()} /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md border-black">
          Controller
        </div>
        <div className="md:col-span-2 border border-black h-screen p-5 rounded-lg flex items-center justify-center">
          <FormUi form={form} />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
