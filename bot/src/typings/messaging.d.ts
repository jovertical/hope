export interface Recipient {
    /**
     * Facebook users' id
     */
    id: number
}

export interface Sender {
    /**
     * It can be a Page-scoped ID - attached to a user and is unique for each
     * page they start a conversation with, or it can be the page's ID itself.
     */
    id: number
}

export interface QuickReply {
    /**
     * How the quick reply button will be displayed
     */
    content_type: 'text' | 'user_email' | 'user_phone_number'

    /**
     * The text that will be displayed in the Quick Reply button
     */
    title?: string

    /**
     * The postback payload
     */
    payload?: string

    /**
     * The image url that will be prefixed in the Quick Reply button's title
     */
    image_url?: string
}

export interface Attachment {
    /**
     * @see https://developers.facebook.com/docs/messenger-platform/send-messages/#types
     */
    type: 'audio' | 'video' | 'image' | 'file'

    /**
     * The attachment payload, shape varies to the attachment's type
     */
    payload: {
        /**
         * The url of the attachment
         *
         * @see https://developers.facebook.com/docs/messenger-platform/send-messages/#url
         */
        url?: string

        /**
         * @default true
         */
        is_reusable?: boolean
    }
}

export interface Message {
    /**
     * The body of the message.
     */
    text: string

    /**
     * A list of Quick Reply objects.
     */
    quick_replies?: Array<QuickReply>

    /**
     * Message attachment
     *
     * @see https://developers.facebook.com/docs/messenger-platform/send-messages/#sending_attachments
     */
    attachment?: Attachment
}
