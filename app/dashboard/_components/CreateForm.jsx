"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiChatSession } from "@/configs/AiModel";
import { db } from "@/configs/index";
import { forms } from "@/configs/schema";
import moment from "moment";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState();
  const[loading,setLoading] = useState(false);
  const{user} = useUser();
  const route = useRouter();
  const PROMPT =
    ",On the basis of description please give the form in json format with form title,form subheadng,form field,form name,placeholder name and form label,field type,field required in json format";
  const onCreateForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description:" + userInput + PROMPT
    );
    console.log(result.response.text());
    if(result.response.text()){
        const resp = await db.insert(forms).values({
            jsonform:result.response.text(),
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format("DD/MM/YYYY")
        }).returning({id:forms.id});
        console.log("New form id :" + resp[0].id);
        if(resp[0].id){
            route.push("/edit-style/"+resp[0].id)
        }
        setLoading(false);
    }
    setLoading(false);
  };
  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="Write description for your form"
                onChange={(e) => setUserInput(e.target.value)}
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button
                  onClick={() => setOpenDialog(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button disabled={loading} onClick={() => onCreateForm()}
                >{loading?<Loader2 className="animate-spin"/> : "Create"}</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
