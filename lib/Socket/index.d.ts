/// <reference types="node" />
import { UserFacingSocketConfig } from "../Types";
declare const makeWASocket: (config: UserFacingSocketConfig) => {
  register: (code: string) => Promise<import("./registration").ExistsResponse>;
  requestRegistrationCode: (
    registrationOptions?:
      | import("./registration").RegistrationOptions
      | undefined
  ) => Promise<import("./registration").ExistsResponse>;
  logger: import("pino").Logger<import("pino").LoggerOptions>;
  getOrderDetails: (
    orderId: string,
    tokenBase64: string
  ) => Promise<import("../Types").OrderDetails>;
  getCatalog: ({
    jid,
    limit,
    cursor,
  }: import("../Types").GetCatalogOptions) => Promise<{
    products: import("../Types").Product[];
    nextPageCursor: string | undefined;
  }>;
  getCollections: (
    jid?: string | undefined,
    limit?: number
  ) => Promise<{
    collections: import("../Types").CatalogCollection[];
  }>;
  productCreate: (
    create: import("../Types").ProductCreate
  ) => Promise<import("../Types").Product>;
  productDelete: (productIds: string[]) => Promise<{
    deleted: number;
  }>;
  productUpdate: (
    productId: string,
    update: import("../Types").ProductUpdate
  ) => Promise<import("../Types").Product>;
  sendMessageAck: ({
    tag,
    attrs,
    content,
  }: import("../index").BinaryNode) => Promise<void>;
  sendRetryRequest: (
    node: import("../index").BinaryNode,
    forceIncludeKeys?: boolean
  ) => Promise<void>;
  offerCall: (
    toJid: string,
    isVideo?: boolean
  ) => Promise<{
    id: string;
    to: string;
  }>;
  rejectCall: (callId: string, callFrom: string) => Promise<void>;
  getPrivacyTokens: (jids: string[]) => Promise<import("../index").BinaryNode>;
  assertSessions: (jids: string[], force: boolean) => Promise<boolean>;
  relayMessage: (
    jid: string,
    message: import("../Types").WAProto.IMessage,
    {
      messageId: msgId,
      participant,
      additionalAttributes,
      additionalNodes,
      useUserDevicesCache,
      cachedGroupMetadata,
      statusJidList,
    }: import("../Types").MessageRelayOptions
  ) => Promise<string>;
  sendReceipt: (
    jid: string,
    participant: string | undefined,
    messageIds: string[],
    type: import("../Types").MessageReceiptType
  ) => Promise<void>;
  sendReceipts: (
    keys: import("../Types").WAProto.IMessageKey[],
    type: import("../Types").MessageReceiptType
  ) => Promise<void>;
  getButtonArgs: (message: import("../Types").WAProto.IMessage) => {
    [key: string]: string;
  };
  readMessages: (
    keys: import("../Types").WAProto.IMessageKey[]
  ) => Promise<void>;
  refreshMediaConn: (
    forceGet?: boolean
  ) => Promise<import("../Types").MediaConnInfo>;
  getUSyncDevices: (
    jids: string[],
    useCache: boolean,
    ignoreZeroDevices: boolean
  ) => Promise<import("../index").JidWithDevice[]>;
  createParticipantNodes: (
    jids: string[],
    message: import("../Types").WAProto.IMessage,
    extraAttrs?:
      | {
          [key: string]: string;
        }
      | undefined
  ) => Promise<{
    nodes: import("../index").BinaryNode[];
    shouldIncludeDeviceIdentity: boolean;
  }>;
  waUploadToServer: import("../Types").WAMediaUploadFunction;
  fetchPrivacySettings: (force?: boolean) => Promise<{
    [_: string]: string;
  }>;
  updateMediaMessage: (
    message: import("../Types").WAProto.IWebMessageInfo
  ) => Promise<import("../Types").WAProto.IWebMessageInfo>;
  sendMessage: (
    jid: string,
    content: import("../Types").AnyMessageContent,
    options?: import("../Types").MiscMessageGenerationOptions
  ) => Promise<import("../Types").WAProto.WebMessageInfo | undefined>;
  sendSingleSelectButton: (
    jid: string,
    config: {
      /**
       * Main message text
       */
      text: string;

      /**
       * Footer text (optional)
       */
      footer?: string;

      /**
       * Button label that opens the list
       */
      buttonText: string;

      /**
       * List sections and rows
       */
      sections: {
        title: string;
        rows: {
          header: string;
          title: string;
          id: string;
        }[];
      }[];

      /**
       * Optional thumbnail (URL, Buffer, or Stream)
       */
      thumbnail?: string | Buffer;

      /**
       * Quoted message (for reply context)
       */
      quoted?: any;

      /**
       * Optional title above header
       */
      title?: string;

      /**
       * WhatsApp message context (e.g., forwarding info)
       */
      contextInfo?: any;

      /**
       * Optional logger (defaults to console)
       */
      logger?: Console;

      /**
       * Inject extra attributes to the interactiveMessage object
       */
      additionalAttrs?: Record<string, any>;
    }
  ) => Promise<any>;
  /**
   * Custom: Mika Stereo, Mengirim pesan dengan tombol menggunakan format 'ButtonsMessage' (legacy).
   * @param jid ID WhatsApp penerima.
   * @param text Teks utama pesan.
   * @param footer Teks kecil di bagian bawah pesan.
   * @param buttons Array objek tombol yang akan ditampilkan.
   * @param options Opsi tambahan dari Baileys, seperti `quoted` untuk membalas pesan.
   * @returns Promise yang resolve dengan informasi pesan yang terkirim.
   * @example
   * // Contoh mengirim pesan tombol biasa
   * const buttons = [
   * { id: 'id1', text: 'Tombol 1' },
   * { id: 'id2', text: 'Tombol 2' }
   * ];
   * await sock.sendButtonMessage('628xxxxxxx@s.whatsapp.net', 'Ini pesannya', 'Ini footernya', buttons);
   *
   * @example
   * // Contoh membalas pesan (reply) dengan tombol
   * // 'm' adalah objek pesan masuk (WebMessageInfo)
   * const reply_buttons = [
   * { id: 'reply1', text: 'Ya' },
   * { id: 'reply2', text: 'Tidak' }
   * ];
   * await sock.sendButtonMessage(m.key.remoteJid, 'Anda yakin?', 'Pilih satu', reply_buttons, { quoted: m });
   */
  sendButtonMessage: (
    jid: string,
    text: string,
    footer: string,
    buttons: SimpleButton[],
    options?: MiscMessageGenerationOptions
  ) => Promise<proto.WebMessageInfo | undefined>;
  subscribeNewsletterUpdates: (jid: string) => Promise<{
    duration: string;
  }>;
  sleep: (ms: number) => Promise<void>;
  /**
   * Mengambil data JSON dari URL.
   * @param url URL yang akan di-fetch.
   * @param options Opsi untuk node-fetch atau `fetch` bawaan.
   * @returns Promise yang resolve dengan data JSON.
   * @template T Tipe data dari objek JSON yang diharapkan.
   * @example
   *
   * // Buat fungsi async untuk memanggil fetchJSON
   * async function getUserProfile() {
   *    try {
   *        const url = 'https://api.github.com/users/google';
   *        const user = await sock.fetchJSON(url);
   *
   *        console.log(`Nama: ${user.name}`);
   *        console.log(`Perusahaan: ${user.company}`);
   *    } catch (error) {
   *        console.error('Gagal mengambil data:', error);
   *    }
   * }
   *
   * // Jalankan fungsi contoh
   * getUserProfile();
   */
  fetchJSON: (
    url: string,
    options?: RequestInit & {
      headers?: HeadersInit;
    },
    config?: {
      /** Timeout in milliseconds before the request is aborted */
      timeout?: number;

      /** Number of retry attempts for failed requests */
      retries?: number;

      /** Delay in milliseconds between retries */
      retryDelay?: number;

      /** Expected response content-type (defaults to application/json) */
      expectedContentType?: string;
    }
  ) => Promise<T>;
  /**
   * Mengambil Buffer dari berbagai jenis sumber: URL, path file, atau stream.
   * Fungsi ini cerdas dalam mendeteksi tipe input dan menanganinya dengan cara yang sesuai.
   *
   * @param data Sumber data. Bisa berupa URL (string), path file lokal (string), Buffer, atau Readable Stream.
   * @param options Opsi tambahan, khusus digunakan saat mengunduh dari URL dengan fetch.
   * @returns Promise yang resolve dengan Buffer dari sumber data.
   * @throws {Error} Akan melempar error jika input tidak valid atau terjadi kegagalan saat memproses data.
   */
  getBuffer: (
    data: string | Buffer | Readable,
    options?: RequestInit
  ) => Promise<Buffer>;
  newsletterReactionMode: (
    jid: string,
    mode: import("../Types").NewsletterReactionMode
  ) => Promise<void>;
  newsletterUpdateDescription: (
    jid: string,
    description?: string | undefined
  ) => Promise<void>;
  newsletterUpdateName: (jid: string, name: string) => Promise<void>;
  newsletterUpdatePicture: (
    jid: string,
    content: import("../Types").WAMediaUpload
  ) => Promise<void>;
  newsletterRemovePicture: (jid: string) => Promise<void>;
  newsletterUnfollow: (jid: string) => Promise<void>;
  newsletterFollow: (jid: string) => Promise<void>;
  newsletterUnmute: (jid: string) => Promise<void>;
  newsletterMute: (jid: string) => Promise<void>;
  newsletterAction: (
    jid: string,
    type: "mute" | "follow" | "unfollow" | "unmute"
  ) => Promise<void>;
  newsletterCreate: (
    name: string,
    description: string,
    reaction_codes: string
  ) => Promise<import("../Types").NewsletterMetadata>;
  newsletterMetadata: (
    type: "invite" | "jid",
    key: string,
    role?: import("../Types").NewsletterViewRole | undefined
  ) => Promise<import("../Types").NewsletterMetadata>;
  newsletterAdminCount: (jid: string) => Promise<number>;
  newsletterChangeOwner: (jid: string, user: string) => Promise<void>;
  newsletterDemote: (jid: string, user: string) => Promise<void>;
  newsletterDelete: (jid: string) => Promise<void>;
  newsletterReactMessage: (
    jid: string,
    serverId: string,
    code?: string | undefined
  ) => Promise<void>;
  newsletterFetchMessages: (
    type: "invite" | "jid",
    key: string,
    count: number,
    after?: number | undefined
  ) => Promise<import("../Types").NewsletterFetchedUpdate[]>;
  newsletterFetchUpdates: (
    jid: string,
    count: number,
    after?: number | undefined,
    since?: number | undefined
  ) => Promise<import("../Types").NewsletterFetchedUpdate[]>;
  groupMetadata: (jid: string) => Promise<import("../Types").GroupMetadata>;
  groupCreate: (
    subject: string,
    participants: string[]
  ) => Promise<import("../Types").GroupMetadata>;
  groupLeave: (id: string) => Promise<void>;
  groupUpdateSubject: (jid: string, subject: string) => Promise<void>;
  groupRequestParticipantsList: (jid: string) => Promise<
    {
      [key: string]: string;
    }[]
  >;
  groupRequestParticipantsUpdate: (
    jid: string,
    participants: string[],
    action: "reject" | "approve"
  ) => Promise<
    {
      status: string;
      jid: string;
    }[]
  >;
  groupParticipantsUpdate: (
    jid: string,
    participants: string[],
    action: import("../Types").ParticipantAction
  ) => Promise<
    {
      status: string;
      jid: string;
      content: import("../index").BinaryNode;
    }[]
  >;
  groupUpdateDescription: (
    jid: string,
    description?: string | undefined
  ) => Promise<void>;
  groupInviteCode: (jid: string) => Promise<string | undefined>;
  groupRevokeInvite: (jid: string) => Promise<string | undefined>;
  groupAcceptInvite: (code: string) => Promise<string | undefined>;
  groupAcceptInviteV4: (
    key: string | import("../Types").WAProto.IMessageKey,
    inviteMessage: import("../Types").WAProto.Message.IGroupInviteMessage
  ) => Promise<string>;
  groupGetInviteInfo: (
    code: string
  ) => Promise<import("../Types").GroupMetadata>;
  groupToggleEphemeral: (
    jid: string,
    ephemeralExpiration: number
  ) => Promise<void>;
  groupSettingUpdate: (
    jid: string,
    setting: "announcement" | "locked" | "not_announcement" | "unlocked"
  ) => Promise<void>;
  groupMemberAddMode: (
    jid: string,
    mode: "all_member_add" | "admin_add"
  ) => Promise<void>;
  groupJoinApprovalMode: (jid: string, mode: "on" | "off") => Promise<void>;
  groupFetchAllParticipating: () => Promise<{
    [_: string]: import("../Types").GroupMetadata;
  }>;
  processingMutex: {
    mutex<T>(code: () => T | Promise<T>): Promise<T>;
  };
  upsertMessage: (
    msg: import("../Types").WAProto.IWebMessageInfo,
    type: import("../Types").MessageUpsertType
  ) => Promise<void>;
  appPatch: (patchCreate: import("../Types").WAPatchCreate) => Promise<void>;
  sendPresenceUpdate: (
    type: import("../Types").WAPresence,
    toJid?: string | undefined
  ) => Promise<void>;
  presenceSubscribe: (
    toJid: string,
    tcToken?: Buffer | undefined
  ) => Promise<void>;
  profilePictureUrl: (
    jid: string,
    type?: "image" | "preview",
    timeoutMs?: number | undefined
  ) => Promise<string | undefined>;
  onWhatsApp: (...jids: string[]) => Promise<
    {
      exists: boolean;
      jid: string;
    }[]
  >;
  fetchBlocklist: () => Promise<string[]>;
  fetchStatus: (jid: string) => Promise<
    | {
        status: string | undefined;
        setAt: Date;
      }
    | undefined
  >;
  updateProfilePicture: (
    jid: string,
    content: import("../Types").WAMediaUpload
  ) => Promise<void>;
  removeProfilePicture: (jid: string) => Promise<void>;
  updateProfileStatus: (status: string) => Promise<void>;
  updateProfileName: (name: string) => Promise<void>;
  updateBlockStatus: (
    jid: string,
    action: "block" | "unblock"
  ) => Promise<void>;
  updateLastSeenPrivacy: (
    value: import("../Types").WAPrivacyValue
  ) => Promise<void>;
  updateOnlinePrivacy: (
    value: import("../Types").WAPrivacyOnlineValue
  ) => Promise<void>;
  updateProfilePicturePrivacy: (
    value: import("../Types").WAPrivacyValue
  ) => Promise<void>;
  updateStatusPrivacy: (
    value: import("../Types").WAPrivacyValue
  ) => Promise<void>;
  updateReadReceiptsPrivacy: (
    value: import("../Types").WAReadReceiptsValue
  ) => Promise<void>;
  updateGroupsAddPrivacy: (
    value: import("../Types").WAPrivacyValue
  ) => Promise<void>;
  updateDefaultDisappearingMode: (duration: number) => Promise<void>;
  getBusinessProfile: (
    jid: string
  ) => Promise<void | import("../Types").WABusinessProfile>;
  resyncAppState: (
    collections: readonly (
      | "critical_block"
      | "critical_unblock_low"
      | "regular_high"
      | "regular_low"
      | "regular"
    )[],
    isInitialSync: boolean
  ) => Promise<void>;
  chatModify: (
    mod: import("../Types").ChatModification,
    jid: string
  ) => Promise<void>;
  cleanDirtyBits: (
    type: "account_sync" | "groups",
    fromTimestamp?: string | number | undefined
  ) => Promise<void>;
  addChatLabel: (jid: string, labelId: string) => Promise<void>;
  removeChatLabel: (jid: string, labelId: string) => Promise<void>;
  addMessageLabel: (
    jid: string,
    messageId: string,
    labelId: string
  ) => Promise<void>;
  removeMessageLabel: (
    jid: string,
    messageId: string,
    labelId: string
  ) => Promise<void>;
  star: (
    jid: string,
    messages: {
      id: string;
      fromMe?: boolean | undefined;
    }[],
    star: boolean
  ) => Promise<void>;
  type: "md";
  ws: any;
  ev: import("../Types").BaileysEventEmitter & {
    process(
      handler: (
        events: Partial<import("../Types").BaileysEventMap>
      ) => void | Promise<void>
    ): () => void;
    buffer(): void;
    createBufferedFunction<A extends any[], T_1>(
      work: (...args: A) => Promise<T_1>
    ): (...args: A) => Promise<T_1>;
    flush(force?: boolean | undefined): boolean;
    isBuffering(): boolean;
  };
  authState: {
    creds: import("../Types").AuthenticationCreds;
    keys: import("../Types").SignalKeyStoreWithTransaction;
  };
  signalRepository: import("../Types").SignalRepository;
  user: import("../Types").Contact | undefined;
  generateMessageTag: () => string;
  query: (
    node: import("../index").BinaryNode,
    timeoutMs?: number | undefined
  ) => Promise<import("../index").BinaryNode>;
  waitForMessage: <T_2>(
    msgId: string,
    timeoutMs?: number | undefined
  ) => Promise<T_2>;
  waitForSocketOpen: () => Promise<void>;
  sendRawMessage: (data: Uint8Array | Buffer) => Promise<void>;
  sendNode: (frame: import("../index").BinaryNode) => Promise<void>;
  logout: (msg?: string | undefined) => Promise<void>;
  end: (error: Error | undefined) => void;
  onUnexpectedError: (
    err: Error | import("@hapi/boom").Boom<any>,
    msg: string
  ) => void;
  uploadPreKeys: (count?: number) => Promise<void>;
  uploadPreKeysToServerIfRequired: () => Promise<void>;
  requestPairingCode: (phoneNumber: string) => Promise<string>;
  waitForConnectionUpdate: (
    check: (
      u: Partial<import("../Types").ConnectionState>
    ) => boolean | undefined,
    timeoutMs?: number | undefined
  ) => Promise<void>;
  sendWAMBuffer: (wamBuffer: Buffer) => Promise<import("../index").BinaryNode>;
};
export default makeWASocket;
