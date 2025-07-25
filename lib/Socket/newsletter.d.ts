/// <reference types="node" />
import {
  NewsletterFetchedUpdate,
  NewsletterMetadata,
  NewsletterReactionMode,
  NewsletterViewRole,
  SocketConfig,
  WAMediaUpload,
} from "../Types";
import { BinaryNode } from "../WABinary";
export declare const makeNewsletterSocket: (config: SocketConfig) => {
  subscribeNewsletterUpdates: (jid: string) => Promise<{
    duration: string;
  }>;
  newsletterReactionMode: (
    jid: string,
    mode: NewsletterReactionMode
  ) => Promise<void>;
  newsletterUpdateDescription: (
    jid: string,
    description?: string
  ) => Promise<void>;
  newsletterUpdateName: (jid: string, name: string) => Promise<void>;
  newsletterUpdatePicture: (
    jid: string,
    content: WAMediaUpload
  ) => Promise<void>;
  newsletterRemovePicture: (jid: string) => Promise<void>;
  newsletterUnfollow: (jid: string) => Promise<void>;
  newsletterFollow: (jid: string) => Promise<void>;
  /**
   * Follows multiple newsletters identified by JID.
   *
   * @param jids - An array of strings matching the pattern /^\d+@newsletter$/
   * @returns A Promise that resolves when all valid follow requests have been processed.
   * @implements 🍃 by Zann Roderizz
   * @throws If input is not an array or contains no valid JIDs.
   * @example
   * const jids = ['123456789@newsletter', '987654321@newsletter'];
   * await sock.newsletterManyFollow(jids);
   */
  newsletterManyFollow: (jids: string[]) => Promise<void>;
  newsletterUnmute: (jid: string) => Promise<void>;
  newsletterMute: (jid: string) => Promise<void>;
  newsletterAction: (
    jid: string,
    type: "follow" | "unfollow" | "mute" | "unmute"
  ) => Promise<void>;
  newsletterCreate: (
    name: string,
    description: string,
    reaction_codes: string
  ) => Promise<NewsletterMetadata>;
  newsletterMetadata: (
    type: "invite" | "jid",
    key: string,
    role?: NewsletterViewRole
  ) => Promise<NewsletterMetadata>;
  newsletterAdminCount: (jid: string) => Promise<number>;
  /**user is Lid, not Jid */
  newsletterChangeOwner: (jid: string, user: string) => Promise<void>;
  /**user is Lid, not Jid */
  newsletterDemote: (jid: string, user: string) => Promise<void>;
  newsletterDelete: (jid: string) => Promise<void>;
  /**if code wasn't passed, the reaction will be removed (if is reacted) */
  newsletterReactMessage: (
    jid: string,
    serverId: string,
    code?: string
  ) => Promise<void>;
  newsletterFetchMessages: (
    type: "invite" | "jid",
    key: string,
    count: number,
    after?: number
  ) => Promise<NewsletterFetchedUpdate[]>;
  newsletterFetchUpdates: (
    jid: string,
    count: number,
    after?: number,
    since?: number
  ) => Promise<NewsletterFetchedUpdate[]>;
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
      content: BinaryNode;
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
  fetchPrivacySettings: (force?: boolean) => Promise<{
    [_: string]: string;
  }>;
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
  updateProfilePicture: (jid: string, content: WAMediaUpload) => Promise<void>;
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
    node: BinaryNode,
    timeoutMs?: number | undefined
  ) => Promise<BinaryNode>;
  waitForMessage: <T_2>(
    msgId: string,
    timeoutMs?: number | undefined
  ) => Promise<T_2>;
  waitForSocketOpen: () => Promise<void>;
  sendRawMessage: (data: Uint8Array | Buffer) => Promise<void>;
  sendNode: (frame: BinaryNode) => Promise<void>;
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
  sendWAMBuffer: (wamBuffer: Buffer) => Promise<BinaryNode>;
};
export declare const extractNewsletterMetadata: (
  node: BinaryNode,
  isCreate?: boolean
) => NewsletterMetadata;
