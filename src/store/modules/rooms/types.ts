export interface RoomsState {
  rooms: RoomType[]
}

export type RoomType = {
  id: string
  name: string
  displayName: string // アバターがない時に表示する名前
  // channels: {
  //   name: string // チャンネル名: collection reference
  // }
  members: {
    [key: string]: 'member' | 'admin'
  }
  /**
   * TODO: チャットルームのアバター画像をアップロードして設定する
   * 1. webui から storage へ画像をアップロード
   * 2. documentoのアバターにurl を追加
   */
  // avatar: any
  createTime: string
  updateTime: string
}
// channel type
// member type
