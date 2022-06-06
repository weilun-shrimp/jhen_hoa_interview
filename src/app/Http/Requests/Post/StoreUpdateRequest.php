<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

use Illuminate\Contracts\Validation\Validator;

use App\Models\PostCat;

use Illuminate\Http\Exceptions\HttpResponseException;

class StoreUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'cat_id' => 'nullable|integer|min:1',
            'img' => 'nullable|sometimes|image|mimes:jpeg,png,jpg',
            'description' => 'nullable|string|max:512',
            'content' => 'nullable|string',
            'tags' => 'nullable|array',
            'tags.*' => 'string|max:255'
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    // public function withValidator($validator)
    // {
    //     $validator->after(function ($validator) {
    //         if ($this->cat_id) {
    //             $cat = PostCat::find($this->cat_id);
    //             if (!$cat) $validator->errors()->add("cat_id', 'System can't find designate post cat resource by $this->cat_id.");
    //             else $this->cat = $cat;
    //         }
    //     });
    // }

    protected function failedValidation(Validator $validator)
    {
        $response = response()->json($validator->errors(), 422);
        throw new HttpResponseException($response);
    }
}
