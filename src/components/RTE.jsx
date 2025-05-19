// Import necessary dependencies
import React from 'react';
import { Editor } from '@tinymce/tinymce-react'; // TinyMCE Rich Text Editor component
import { Controller } from 'react-hook-form';    // Controller to integrate custom components with react-hook-form

// Define the RTE (Rich Text Editor) functional component
// Props: name (form field name), control (from react-hook-form), label (optional label), defaultValue (initial editor content)
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'> 
      {/* Render label if provided */}
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      {/* Use Controller to integrate TinyMCE Editor with react-hook-form */}
      <Controller
        name={name || "content"} // Use provided name or fallback to "content"
        control={control}        // Pass control object from useForm()
        
        // Define how the custom input (TinyMCE Editor) should behave
        render={({ field: { onChange } }) => (
          <Editor
            apiKey='ktcezy4hm80pfzi3sij90pyupmlpofjxtbixxz5mmb3blje7'
            initialValue={defaultValue} // Set initial content of the editor

            // TinyMCE Editor configuration
            init={{
              initialValue: defaultValue, // Redundant but harmless
              height: 500,                 // Set editor height
              menubar: true,              // Show menu bar
              plugins: [                  // Load desired plugins for rich features
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:                    // Define toolbar options
                "undo redo | blocks | image | bold italic forecolor | " +
                "alignleft aligncenter alignright alignjustify | " +
                "bullist numlist outdent indent | removeformat | help",
              content_style:             // Apply custom styling to editor content
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}

            // Update react-hook-form state when editor content changes
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
